import { Fragment, type ReactNode } from "react";
import { type InlineToken, tokenizeInline } from "../content/inline";

function renderToken(token: InlineToken, key: number): ReactNode {
  switch (token.kind) {
    case "strong":
      return <strong key={key}>{token.text}</strong>;
    case "em":
      return <em key={key}>{token.text}</em>;
    case "span":
      return (
        <span key={key} className={token.className}>
          {token.text}
        </span>
      );
    default:
      return <Fragment key={key}>{token.text}</Fragment>;
  }
}

/** Render a line of copy with **bold**, *italic*, and `[text]{.class}` spans. */
export function RichText({ text }: { text: string }): ReactNode {
  return <>{tokenizeInline(text).map((token, i) => renderToken(token, i))}</>;
}

/** Render multi-line copy, turning each source line break into a `<br />`. */
export function Lines({ text }: { text: string }): ReactNode {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <Fragment key={i}>
          {i > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </>
  );
}
