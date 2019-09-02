import React from 'react';

type InputRef = HTMLInputElement | HTMLTextAreaElement;

interface InputProps {
  prefixCls: string;
  id: string;
  inputElement: React.ReactElement;
  disabled: boolean;
  autoFocus: boolean;
  editable: boolean;
  accessibilityIndex: number;
  value: string;
  open: boolean;
  tabIndex: number;

  onKeyDown: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLElement>;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  {
    prefixCls,
    id,
    inputElement,
    disabled,
    tabIndex,
    autoFocus,
    editable,
    accessibilityIndex,
    value,
    onKeyDown,
    onChange,
    open,
  },
  ref,
) => {
  let inputNode: React.ReactElement = inputElement || <input />;

  const { onKeyDown: onOriginKeyDown, onChange: onOriginChange } = inputNode.props;

  inputNode = React.cloneElement(inputNode, {
    id,
    ref,
    disabled,
    tabIndex,
    autoComplete: 'off',
    autoFocus,
    className: `${prefixCls}-selection-search-input`,
    style: { opacity: editable ? null : 0 },
    role: 'combobox',
    'aria-expanded': open,
    'aria-haspopup': 'listbox',
    'aria-owns': `${id}_list`,
    'aria-autocomplete': 'list',
    'aria-controls': `${id}_list`,
    'aria-activedescendant': `${id}_list_${accessibilityIndex}`,
    value: editable ? value : '',
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
      onKeyDown(event);
      if (onOriginKeyDown) {
        onOriginKeyDown(event);
      }
    },
    onChange: (event: React.ChangeEvent<HTMLElement>) => {
      onChange(event);
      if (onOriginChange) {
        onOriginChange(event);
      }
    },
  });

  return inputNode;
};

const RefInput = React.forwardRef<InputRef, InputProps>(Input);
RefInput.displayName = 'Input';

export default RefInput;
