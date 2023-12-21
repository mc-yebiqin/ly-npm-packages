"use client";
import { DocumentEditor } from "@ly/prosemirror";
import React, { memo } from "react";

const ProsemirrorPage = () => {
  return (
    <div>
      <DocumentEditor />
    </div>
  );
};

export default memo(ProsemirrorPage);
