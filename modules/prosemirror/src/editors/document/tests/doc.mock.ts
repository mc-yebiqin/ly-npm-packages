import { ListTypeEnum } from "@ly/prosemirror";

const initMockData = () => {
  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        attrs: {
          id: null,
          indent: 0,
        },
        content: [
          {
            type: "text",
            text: "Hello World!",
          },
        ],
      },
      {
        type: "action_item",
        content: [
          {
            type: "text",
            text: "Hello World!",
          },
        ],
      },
      {
        type: "block_code",
        content: [
          {
            type: "text",
            text: "function demo () {}",
          },
        ],
      },
      {
        type: "block_quote",
        content: [
          {
            type: "text",
            text: "Hello World!",
          },
        ],
      },
      {
        type: "table",
        attrs: {
          id: 0.742340182091316,
          indent: 0,
        },
        content: [
          {
            type: "table_tr",
            attrs: {
              id: 0.24502424574431192,
              indent: 0,
            },
            content: [
              {
                type: "table_td",
                attrs: {
                  id: 0.47015650538214904,
                  indent: 0,
                },
              },
              {
                type: "table_td",
                attrs: {
                  id: 0.47015650538214904,
                  indent: 0,
                },
              },
              {
                type: "table_td",
                attrs: {
                  id: 0.47015650538214904,
                  indent: 0,
                },
              },
              {
                type: "table_td",
                attrs: {
                  id: 0.47015650538214904,
                  indent: 0,
                },
              },
              {
                type: "table_td",
                attrs: {
                  id: 0.47015650538214904,
                  indent: 0,
                },
              },
            ],
          },
          {
            type: "table_tr",
            attrs: {
              id: 0.24502424574431192,
              indent: 0,
            },
            content: [
              {
                type: "table_td",
                attrs: {
                  id: 0.47015650538214904,
                  indent: 0,
                },
              },
              {
                type: "table_td",
                attrs: {
                  id: 0.47015650538214904,
                  indent: 0,
                },
              },
              {
                type: "table_td",
                attrs: {
                  id: 0.47015650538214904,
                  indent: 0,
                },
              },
              {
                type: "table_td",
                attrs: {
                  id: 0.47015650538214904,
                  indent: 0,
                },
              },
              {
                type: "table_td",
                attrs: {
                  id: 0.47015650538214904,
                  indent: 0,
                },
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
      },
      {
        type: "paragraph",
        attrs: {
          id: null,
          indent: 0,
        },
        content: [
          {
            type: "text",
            text: "Hello World!",
          },
        ],
      },
      {
        type: "graphic",
      },
      {
        type: "heading",
        attrs: {
          level: 1,
        },
        content: [
          {
            type: "text",
            text: "Hello World!",
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 2,
        },
        content: [
          {
            type: "text",
            text: "Hello World!",
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 3,
        },
        content: [
          {
            type: "text",
            text: "Hello World!",
          },
        ],
      },
      {
        type: "image_item",
      },
      {
        type: "paragraph",
        attrs: {
          id: null,
          indent: 0,
        },
        content: [
          {
            type: "text",
            text: "Hello World!",
          },
        ],
      },
      {
        type: "horizontal_rule",
      },
      {
        type: "list_item",
        attrs: {
          type: ListTypeEnum.Ordered,
          indent: 0,
        },
        content: [
          {
            type: "text",
            text: "Hello World!",
          },
        ],
      },
      {
        type: "list_item",
        attrs: {
          type: ListTypeEnum.Ordered,
          indent: 1,
        },
        content: [
          {
            type: "text",
            text: "Hello World!",
          },
        ],
      },
      {
        type: "list_item",
        attrs: {
          type: ListTypeEnum.Ordered,
          indent: 2,
        },
        content: [
          {
            type: "text",
            text: "Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World!",
          },
        ],
      },
      {
        type: "list_item",
        attrs: {
          type: ListTypeEnum.Ordered,
          indent: 2,
        },
        content: [
          {
            type: "text",
            text: "Hello World!",
          },
        ],
      },
      {
        type: "list_item",
        attrs: {
          type: ListTypeEnum.Ordered,
          indent: 1,
        },
        content: [
          {
            type: "text",
            text: "Hello World!",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: {
          id: null,
          indent: 0,
        },
        content: [
          {
            type: "text",
            text: "Hello World!",
          },
        ],
      },
      {
        type: "list_item",
        attrs: {
          type: ListTypeEnum.Ordered,
          indent: 0,
        },
        content: [
          {
            type: "text",
            text: "Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!",
          },
        ],
      },
    ],
  };
};

export default initMockData;
