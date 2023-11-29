"use client";

import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Button } from "antd";
import Link from "next/link";

// 测试样式
const TestStyle = styled.div``;

// 固定窗口
const FixedDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 80px;
  background-color: white;
`;

export default function Page() {
  return (
    <>
      <Link href={"/test"}>
        <FixedDiv>
          <Button>测试</Button>
        </FixedDiv>
      </Link>
    </>
  );
}
