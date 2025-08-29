"use client";

import { DecoratorNode, type NodeKey, type SerializedLexicalNode } from "lexical";
import { JSX } from "react";

interface SerializedPlanNode extends SerializedLexicalNode {
  date: string;
}

function getToday(): string {
  return new Date().toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export class PlanNode extends DecoratorNode<JSX.Element> {
  __date: string;

  static getType() {
    return "plan";
  }
  static clone(node: PlanNode) {
    return new PlanNode(node.__date, node.getKey());
  }

  constructor(date: string = getToday(), key?: NodeKey) {
    super(key);
    this.__date = date;
  }

  exportJSON(): SerializedPlanNode {
    return {
      ...super.exportJSON(),
      type: "plan",
      version: 1,
      date: this.__date,
    };
  }

  static importJSON(serialized: SerializedPlanNode) {
    return new PlanNode(serialized.date);
  }

  createDOM() {
    const div = document.createElement("div");
    div.className = "bg-yellow-50 p-4 rounded-md mb-4";
    return div;
  }

  updateDOM(): false {
    return false;
  }

  decorate() {
    return (
      <div>
        <h4 className="font-bold mb-2">🗒️ Plan for {this.__date}</h4>
        <ol className="list-decimal list-inside text-sm space-y-1">
          <li>
            <input placeholder="Top task #1" className="w-full border-b focus:outline-none" />
          </li>
          <li>
            <input placeholder="Top task #2" className="w-full border-b focus:outline-none" />
          </li>
          <li>
            <input placeholder="Top task #3" className="w-full border-b focus:outline-none" />
          </li>
        </ol>
      </div>
    );
  }
}
