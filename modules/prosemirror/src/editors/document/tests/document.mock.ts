const tempContent = [];
for (let index = 0; index < 6; index++) {
  tempContent.push({
    type: "paragraph",
    attrs: {
      indent: 0,
    },
    content: [
      {
        type: "text",
        text: `${index + 1}:我是测试内容`,
      },
    ],
  });
}

tempContent.push({
  type: "ordered_list",
  content: [
    {
      type: "list_item",
    },
  ],
});

tempContent.push({
  type: "ordered_list",
  content: [
    {
      type: "list_item",
    },
  ],
});

const initNotepadMock = {
  type: "doc",
  content: tempContent,
};

export default initNotepadMock;
