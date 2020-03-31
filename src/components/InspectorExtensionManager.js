export default function registerInspectorExtension(node, config, root = '') {
  const inspectorItems = getInspectorItems(node, config, root);
  addInspectorItem(inspectorItems, config);
  node.inspectorConfig[0].items.sort(moveAdvancedAccordionToBottom);
}

function moveAdvancedAccordionToBottom(accordionA, accordionB) {
  if (isAdvancedAccordion(accordionA)) {
    return 1;
  }

  if (isAdvancedAccordion(accordionB)) {
    return -1;
  }

  return 0;
}

function addInspectorItem(inspectorItems, config) {
  const nodeIndex = inspectorItems.findIndex(item => {
    return (config.id && config.id === item.id) || (config.config && config.config.name === item.config.name);
  });
  if (nodeIndex === -1) {
    inspectorItems.push(config);
    return;
  }
  inspectorItems[nodeIndex] = config;
}

function getInspectorItems(node, config, root) {
  if (typeof config.container !== 'undefined') {
    return node.inspectorConfig[0].items;
  }
  if (root) {
    node = node.inspectorConfig[0];
    root = root.split('.');
    while (node && root.length) {
      node = node.items.find(node => node.config.name === root[0]);
      root.shift();
    }
    return node ? node.items : null;
  } else {
    return node.inspectorConfig[0].items[0].items;
  }
}

function isAdvancedAccordion(accordion) {
  return accordion.config && accordion.config.label === 'Advanced';
}
