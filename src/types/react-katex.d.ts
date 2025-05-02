declare module 'react-katex' {
    import * as React from 'react';
  
    export interface InlineMathProps {
      math: string;
      errorColor?: string;
    }
  
    export interface BlockMathProps {
      math: string;
      errorColor?: string;
    }
  
    export class InlineMath extends React.Component<InlineMathProps> {}
    export class BlockMath extends React.Component<BlockMathProps> {}
  }