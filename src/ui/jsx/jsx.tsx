"use client";
import { useState } from "react";
import styles from "./jsx.module.css";
import React from "react";
import useToast from "@/hooks/useToast";

const tags: Array<{
  regex: RegExp;
  Component: (props: { children: any }) => JSX.Element;
  custom?: (
    next: (html: string, i: number) => any
  ) => (html: string, i: number) => JSX.Element | string;
}> = [
  {
    regex: /<blockquote expandable>([\s\S]*?)<\/blockquote>/gi,
    Component: ({ children }) => {
      const [expanded, setExpand] = useState(false);
      return (
        <blockquote
          className={expanded ? styles.expanded : styles.expandable}
          onClick={() => setExpand(!expanded)}
        >
          {children}
        </blockquote>
      );
    },
  },
  {
    regex: /<blockquote>([\s\S]*?)<\/blockquote>/gi,
    Component: ({ children }) => <blockquote>{children}</blockquote>,
  },
  {
    regex: /<tg-spoiler>([\s\S]*?)<\/tg-spoiler>/gi,
    Component: ({ children }) => {
      const [visible, setVisibility] = useState(false);
      return (
        <span
          className={visible ? styles.visible : styles.unvisible}
          onClick={() => setVisibility(!visible)}
        >
          <span className={styles.noise}></span>
          {children}
        </span>
      );
    },
  },
  {
    regex: /<b>([\s\S]*?)<\/b>/gi,
    Component: ({ children }) => <b>{children}</b>,
  },
  {
    regex: /<i>([\s\S]*?)<\/i>/gi,
    Component: ({ children }) => <i>{children}</i>,
  },
  {
    regex: /<u>([\s\S]*?)<\/u>/gi,
    Component: ({ children }) => <u>{children}</u>,
  },
  {
    regex: /<s>([\s\S]*?)<\/s>/gi,
    Component: ({ children }) => <s>{children}</s>,
  },
  {
    regex: /<code>([\s\S]*?)<\/code>/gi,
    Component: ({ children }) => {
      const { toast } = useToast();
      return (
        <code
          onClick={() => {
            toast(`Copied to clipboard`);
            navigator.clipboard.writeText(children);
          }}
        >
          {children}
        </code>
      );
    },
  },
  {
    regex: /<pre>([\s\S]*?)<\/pre>/gi,
    Component: ({ children }) => {
      const { toast } = useToast();
      return (
        <pre
          onClick={() => {
            toast(`Copied to clipboard`);
            navigator.clipboard.writeText(children);
          }}
        >
          {children}
        </pre>
      );
    },
  },
  {
    regex:
      /<a href="(https?:\/\/t\.me\/\S+|tg:\/\/user\?id=\d+)">([\s\S]*?)<\/a>/gi,
    Component: () => <></>,
    custom: (next) => {
      let elements = [];
      return (html, i) => {
        elements.push(html);
        const step = i % 4;
        switch (step) {
          case 0:
            return next(html, i);
          case 1:
            return ``;
          case 2:
            return (
              <button
                key={i}
                onClick={() =>
                  window.Telegram.WebApp.openTelegramLink(elements[i - 1])
                }
              >
                {html}
              </button>
            );
          case 3:
            return next(html, i);
        }
      };
    },
  },
  {
    regex: /<a href="(.*?)">([\s\S]*?)<\/a>/gi,
    Component: () => <></>,
    custom: (next) => {
      let elements = [];
      return (html, i) => {
        elements.push(html);
        const step = i % 3;
        switch (step) {
          case 0:
            return next(html, i);
          case 1:
            return ``;
          case 2:
            return (
              <button
                key={i}
                onClick={() => window.Telegram.WebApp.openLink(elements[i - 1])}
              >
                {html}
              </button>
            );
        }
      };
    },
  },
];

export default function ToJsx({
  children,
  index = 0,
}: {
  children: string;
  index?: number;
}) {
  const { regex, Component, custom } = tags[index];
  const next = (html: string, i: number) =>
    tags[index + 1] ? (
      <ToJsx key={i} index={index + 1}>
        {html}
      </ToJsx>
    ) : (
      html
    );
  const result = children
    .split(regex)
    .map(
      custom
        ? custom(next)
        : (html, i) =>
            i % 2 ? (
              <Component key={i}>{next(html, i)}</Component>
            ) : (
              next(html, i)
            )
    );
  return index ? result : <div className={styles.jsx}>{result}</div>;
}
