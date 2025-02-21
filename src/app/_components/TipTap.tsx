"use client";

import { cn } from "@/utils";
import {
  BubbleMenu,
  type Editor,
  EditorContent,
  FloatingMenu,
} from "@tiptap/react";
import React, { useEffect } from "react";

const TipTap = ({ editor }: { editor: Editor | null }) => {
  return (
    <div className="card bg-base-200 mt-4 shadow-sm">
      {editor && (
        <>
          {editor.isEditable && (
            <>
              <div className="control-group">
                <div className="button-group">
                  <input
                    type="color"
                    onInput={(event) =>
                      // @ts-expect-error value is set
                      editor.chain().focus().setColor(event.target.value).run()
                    }
                    value={editor.getAttributes("textStyle").color}
                    data-testid="setColor"
                  />
                  <EditorButton
                    onClick={() => editor.chain().focus().unsetColor().run()}
                    data-testid="unsetColor"
                    className=""
                    name="Unset color"
                  />
                  <EditorButton
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
                    className={editor.isActive("bulletList") ? "is-active" : ""}
                    name="Toggle bullet list"
                  />
                  <EditorButton
                    onClick={() =>
                      editor.chain().focus().splitListItem("listItem").run()
                    }
                    disabled={!editor.can().splitListItem("listItem")}
                    className=""
                    name="Split list item"
                  />
                  <EditorButton
                    onClick={() =>
                      editor.chain().focus().sinkListItem("listItem").run()
                    }
                    disabled={!editor.can().sinkListItem("listItem")}
                    className=""
                    name="Sink list item"
                  />
                  <EditorButton
                    onClick={() =>
                      editor.chain().focus().liftListItem("listItem").run()
                    }
                    disabled={!editor.can().liftListItem("listItem")}
                    className=""
                    name="Lift list item"
                  />
                </div>
              </div>
              <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <div data-testid="floating-menu" className="floating-menu">
                  <EditorButton
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    className={
                      editor.isActive("heading", { level: 1 })
                        ? "btn-active"
                        : ""
                    }
                    name="H1"
                  />
                  <EditorButton
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={
                      editor.isActive("heading", { level: 2 })
                        ? "btn-active"
                        : ""
                    }
                    name="H2"
                  />
                  <EditorButton
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className={
                      editor.isActive("heading", { level: 3 })
                        ? "btn-active"
                        : ""
                    }
                    name="H3"
                  />
                  <EditorButton
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
                    className={
                      editor.isActive("bulletList") ? "btn-active" : ""
                    }
                    name="Bullet list"
                  />
                </div>
              </FloatingMenu>
              <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <div className="bubble-menu">
                  <EditorButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "btn-active" : ""}
                    name="Bold"
                  />
                  <EditorButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "btn-active" : ""}
                    name="Italic"
                  />
                  <EditorButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive("strike") ? "btn-active" : ""}
                    name="Strike"
                  />
                </div>
              </BubbleMenu>
            </>
          )}

          <EditorContent editor={editor} />
        </>
      )}
    </div>
  );
};

function EditorButton({
  className,
  onClick,
  name,
  disabled,
}: {
  name: string;
  className: string;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(["btn", className])}
      disabled={disabled ? disabled : false}
    >
      {name}
    </button>
  );
}

export default TipTap;
