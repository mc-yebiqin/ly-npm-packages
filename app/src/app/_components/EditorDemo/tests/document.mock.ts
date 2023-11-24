const tempContent = [];
for (let index = 0; index < 2; index++) {
  tempContent.push({
    type: "paragraph",
    attrs: {
      indent: 0,
    },
    content: [
      {
        type: "text",
        text: `${
          index + 1
        }:我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容`,
      },
    ],
  });
}

const initNotepadMock = {
  type: "doc",
  content: tempContent,
};

export default initNotepadMock;
