import React from "react";

type FlexAlignType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline'

type FlexProperties = {
  inline?: boolean
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around'
  alignItems?: FlexAlignType
}

type FlexProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  rootComponent?: React.Component
  style?: object
  width?: number | string
  height?: number | string
} & FlexProperties

const reduceProps = (props: FlexProps, ...args: string[]) => {
    let _props = {...props};

    for(var key in _props) {
        // @ts-ignore
        if(args.includes(key)) delete _props[key];
    }

    return _props;
}

/**
 * A component for easier flex-box implementation.
 * @example <Flex justifyContent="space-between" alignItems="center">...</Flex>
 */
const Flex = (props: FlexProps) => {
  const reducedProps = reduceProps(props, "children", "className");

  const style = Object.freeze({
      display: "flex",
      ...reducedProps,
      ...props.style
  });

  const rootEl = props.rootComponent ?? React.createElement("div");

  return React.cloneElement(rootEl as React.ReactElement<any>, { onClick: props.onClick, style, className: props.className, children: props.children });
}

export default Flex;