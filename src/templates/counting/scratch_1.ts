export const config = {
  config: {
    items: {
      type: 'select',
      title: 'Select number',
      default_value: '1',
      options: [
        {
          label: '1',
          value: '1',
        },
        {
          label: '2',
          value: '2',
        },
      ],
    },
    additional_items: {
      type: 'textArray',
      title: 'Additional numbers (up to 9)',
      default_value: ['2'],
      max_length: 4,
      min_length: 0,
      replace_pattern: '[^a-zA-Z]+',
    },
    lock_correct_selection: {
      type: 'select',
      title: 'Lock correct selection',
      default_value: '1',
      options: [
        {
          label: 'No',
          value: '0',
        },
        {
          label: 'Yes',
          value: '1',
        },
      ],
    },
    highlight_correct_selection: {
      type: 'select',
      title: 'Highlight correct selection',
      default_value: '1',
      options: [
        {
          label: 'No',
          value: '0',
        },
        {
          label: 'Yes',
          value: '1',
        },
      ],
    },
    highlight_incorrect_selection: {
      type: 'select',
      title: 'Highlight incorrect selection',
      default_value: '0',
      options: [
        {
          label: 'No',
          value: '0',
        },
        {
          label: 'Yes',
          value: '1',
        },
      ],
    },
    items_total: {
      type: 'text',
      title: 'Total letters',
      default_value: ['dog', 'Like', 'I', 'cat'],
      hidden: true,
    },
  },
  background: {
    title: {
      type: 'title',
      title: 'Scene background',
      default_value: 'Scene background',
    },
    background: {
      type: 'color',
      title: 'Background color',
      default_value: '#ECF2F6',
    },
  },
  image: {
    title: {
      type: 'title',
      title: 'Image',
      default_value: 'Image',
    },
    url: {
      type: 'image',
      title: 'Image',
      default_value: '',
    },
    success_image: {
      type: 'image',
      title: 'Success image',
      default_value: '',
    },
    error_image: {
      type: 'image',
      title: 'Error image',
      default_value: '',
    },
    success_text: {
      type: 'text',
      title: 'Success text',
      default_value: 'Success',
    },
    error_text: {
      type: 'text',
      title: 'Error text',
      default_value: 'Failed',
    },
    success_background: {
      type: 'color',
      title: 'Success background color',
      default_value: '#2e7d32',
    },
    success_text_color: {
      type: 'textColor',
      title: 'Success text color',
      default_value: '#000',
    },
    error_text_color: {
      type: 'textColor',
      title: 'Error text color',
      default_value: '#000',
    },
    error_background: {
      type: 'color',
      title: 'Error background color',
      default_value: '#d32f2f',
    },
    sound: {
      type: 'sound',
      title: 'On click sound link',
      default_value: '',
    },
    success_sound: {
      type: 'sound',
      title: 'On success click sound',
      default_value: '',
    },
    error_sound: {
      type: 'sound',
      title: 'On failed click sound',
      default_value: '',
    },
  },
  selection_text: {
    title: {
      type: 'title',
      title: 'Selection letters',
      default_value: 'Selection letters',
    },
    text_color: {
      type: 'color',
      title: 'Selection letters color',
      default_value: '#000000',
    },
    sound: {
      type: 'sound',
      title: 'On click sound link',
      default_value: '',
    },
  },
  answer_text: {
    title: {
      type: 'title',
      title: 'Answer',
      default_value: 'Answer',
    },
    text_color: {
      type: 'color',
      title: 'Answer color',
      default_value: '#000000',
    },
    success_highlight_color: {
      type: 'color',
      title: 'Success highlight color',
      default_value: 'green',
    },
    error_highlight_color: {
      type: 'color',
      title: 'Error highlight color',
      default_value: 'red',
    },
    sound: {
      type: 'sound',
      title: 'On click sound link',
      default_value: '',
    },
  },
};
