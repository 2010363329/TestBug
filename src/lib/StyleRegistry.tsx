// 这里面不仅仅是Ant Design的style配置 还有styled-components的style配置
// 因为这两个玩意的样式都需要按照官网的配置 这里充分说明了遇到问题一定要找官网 别自己瞎琢磨
// 你遇到的问题 别人一定也遇到过

"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";

const StyledComponentsRegistry = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // 创建styled-components的样式表
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  // 创建ant-design/cssinjs的缓存
  const cache = React.useMemo<Entity>(() => createCache(), []);

  // 检测是否在服务器端插入了html
  const isServerInserted = React.useRef<boolean>(false);
  useServerInsertedHTML(() => {
    // 避免 css 重复插入
    if (isServerInserted.current) {
      return;
    }
    isServerInserted.current = true;

    // 插入ant-design/cssinjs的样式
    return (
      <style
        id="antd"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
    );
  });

  // 清除styled-components的样式标签
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // 在服务器端渲染时，将styled-components的样式表和ant-design/cssinjs的缓存传递给StyleSheetManager和StyleProvider
  if (typeof window !== "undefined") return <>{children}</>;
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <StyleProvider cache={cache}>
        {children as React.ReactChild}
      </StyleProvider>
    </StyleSheetManager>
  );
};

export default StyledComponentsRegistry;
