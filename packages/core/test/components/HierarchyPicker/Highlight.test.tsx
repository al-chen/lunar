import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Highlight, {
  HighlightProps,
} from '../../../src/components/HierarchyPicker/Search/Highlight';

describe('<Highlight />', () => {
  let wrapper: Enzyme.ShallowWrapper<HighlightProps>;

  beforeEach(() => {
    wrapper = shallow(<Highlight fallback="fallback" />);
  });

  it('shows fallback by default', () => {
    expect(wrapper.text()).toBe('fallback');
  });

  it('shows value if match without indices', () => {
    wrapper.setProps({
      match: { indices: [], value: 'whatever', key: 'test' },
    });
    expect(wrapper.find('mark')).toHaveLength(0);
    expect(wrapper.text()).toBe('whatever');
  });

  describe('with indices', () => {
    beforeEach(() => {
      wrapper.setProps({
        match: {
          indices: [
            [0, 5],
            [12, 14],
          ],
          value: 'hello world foo',
          key: 'test',
        },
        word: 'hello',
      });
    });

    it('shows highlighted matches', () => {
      expect(wrapper.find('mark')).toHaveLength(2);
      expect(wrapper.text()).toBe('hello world foo');
    });
  });
});
