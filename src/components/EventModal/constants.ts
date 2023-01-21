import chroma from 'chroma-js';

export const COLOUR_OPTIONS = [
  { value: 'orange', label: 'Orange', color: 'orange' },
  { value: 'gray', label: 'Gray', color: 'gray' },
  { value: 'green', label: 'Green', color: 'green' },
  { value: 'pink', label: 'Pink', color: 'pink' },
  { value: 'red', label: 'Red', color: 'red' },
  { value: 'purple', label: 'Purple', color: 'purple' },
];

export const COLOUR_STYLES = {
  control: (styles: any) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles: { [x: string]: any }, { data, isDisabled, isFocused, isSelected }: any) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles: any, { data }: any) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles: any, { data }: any) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles: any, { data }: any) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};
