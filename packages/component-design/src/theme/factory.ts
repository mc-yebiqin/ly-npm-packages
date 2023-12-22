"use client";
import { defaultThemeSpecs } from "./specs";
import { flattenTokens } from "../utilities";

// 这个函数的作用是将驼峰命名法的字符串转换为短横线命名法的字符串
// 例如：camelToKebab("backgroundColor") -> "background-color"
// 这样做的目的是为了将JavaScript对象的属性名转换为CSS属性名
function camelToKebab(camelCase: string) {
  // 使用正则表达式匹配小写字母后面跟着大写字母的组合，然后在中间插入一个短横线，并将所有字母转换为小写
  return camelCase.replace(/\B([A-Z])/g, "-$1").toLowerCase();
}

// 这个函数的作用是生成一个随机的CSS类名，长度默认为8个字符
// 例如：generateClassName() -> "ly_aBcD3fGh"
function generateClassName(length = 8) {
  // CSS 类名中，开头不能以数字、特殊字符（除了连字符 - 和下划线 _）或者保留的 CSS 关键字作为有效的选择器。
  const classPrefix = "ly_";

  // 定义一个包含所有可能的字符的字符串，包括大小写字母和数字
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  // 循环length次，每次从characters中随机选择一个字符，拼接到类名后面
  const randomName = Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");

  // 返回生成的类名
  return classPrefix + randomName;
}

// 这个类的作用是实现一个系统设计的功能，可以根据主题规范和CSS对象动态生成和应用样式
class SystemDesign {
  // 定义两个私有的属性，分别是用于存放主题样式和类名样式的style标签元素
  private themeStyle: HTMLElement;
  private classesStyle: HTMLElement;

  // 定义一个映射，用于缓存已经生成的类名和对应的CSS键值对
  classesMap: Map<string, string> = new Map();

  // 构造函数，在创建实例时执行
  constructor() {
    // 调用createStyleTag方法，创建两个style标签，并分别赋值给themeStyle和classesStyle属性
    this.themeStyle = this.createStyleTag("theme-style");
    this.classesStyle = this.createStyleTag("classes-style");

    // 调用applyTheme方法，根据默认的主题规范，生成并应用主题样式
    this.applyTheme();
  }

  // 这个方法的作用是根据主题规范，生成并应用主题样式
  // 参数themeSpec是一个对象，包含了主题的各种属性和值，如果没有传入，就使用默认的主题规范
  applyTheme(themeSpec = defaultThemeSpecs) {
    // 调用flattenTokens方法，将主题规范对象转换为两个对象，一个是主题的属性和值的键值对，一个是主题的CSS变量的键值对
    const { themeTokens, themeCSSVars } = flattenTokens(themeSpec);
    // 将主题的CSS变量的键值对，复制到当前实例的属性上，方便后续使用
    Object.assign(this, themeCSSVars);

    // 生成样式字符串，遍历主题的属性和值的键值对，将每一对转换为CSS属性和值的形式，然后用换行符连接起来
    const styleString = Object.entries(themeTokens)
      .map(([property, value]) => `${property}: ${value};`)
      .join("\n");

    // 将样式字符串应用到themeStyle属性对应的style标签的文本内容上，使用:root选择器，表示全局的样式
    this.themeStyle.textContent = `:root {\n${styleString}\n}`;
  }

  // 这个方法的作用是根据CSS对象，生成并返回对应的类名字符串
  // 参数cssObject是一个对象，包含了CSS的属性和值的键值对，如果没有传入，就返回空字符串
  assembleClassNames = (cssObject?: any) => {
    if (!cssObject) return "";

    // 定义一个数组，用于存放生成的类名
    const classesList: string[] = [];

    // 遍历CSS对象的键值对，对于每一对，执行以下操作
    Object.entries(cssObject).forEach(([cssKey, cssValue]: any) => {
      // 调用camelToKebab方法，将CSS的属性名从驼峰命名法转换为短横线命名法
      const kebabCss = camelToKebab(cssKey);
      // 定义一个缓存的键，由CSS的属性名和属性值拼接而成，用于在classesMap中查找是否已经存在对应的类名
      const cacheKey = `${cssKey}_${cssValue}`;

      // 尝试从classesMap中获取缓存的类名，如果没有找到，就执行以下操作
      let className = this.classesMap.get(cacheKey);
      if (!className) {
        // 调用generateClassName方法，生成一个随机的类名
        className = generateClassName();
        // 将生成的类名和缓存的键存放到classesMap中，方便下次查找
        this.classesMap.set(cacheKey, className);
        // 创建一个文本节点，内容是一个CSS规则，选择器是生成的类名，属性和值是CSS对象的键值对
        this.classesStyle.appendChild(
          document.createTextNode(`.${className} { ${kebabCss}: ${cssValue}; }`)
        );
      }

      // 将生成或获取的类名添加到类名数组中
      classesList.push(className);
    });

    // 返回类名数组用空格连接起来的字符串，例如："class1 class2 class3"
    return classesList.join(" ");
  };

  // 这个方法的作用是创建一个style标签，并添加到文档的head元素中
  // 参数id是一个字符串，表示style标签的id属性，用于区分不同的style标签
  private createStyleTag(id: string) {
    // 创建一个style标签元素
    const styleTag = document.createElement("style");
    // 设置style标签的id属性
    styleTag.id = id;
    // 将style标签添加到文档的head元素中，并返回style标签元素
    return document.head.appendChild(styleTag);
  }
}

// 创建一个SystemDesign的实例，并导出为design变量，供其他模块使用
export const design = new SystemDesign();
