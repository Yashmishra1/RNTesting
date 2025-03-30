import {act, fireEvent, render, screen} from '@testing-library/react-native';
import Input from '../../../src/components/ui/Input';

describe('Input', () => {
  const mockOnChangeText = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();

  it('Should render correctly', () => {
    const {getByTestId} = render(
      <Input
       value=''
        onChangeText={mockOnChangeText}
        placeholder="Enter text"
        testID="inputComponent"
      />,
    );
    expect(getByTestId('inputComponent')).toBeTruthy()
  });

  it('Should handle mutliple focus and blur events', () => {
    const {getByTestId} = render(
      <Input
        value=''
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
        onChangeText={mockOnChangeText}
        placeholder="Enter text"
      />,
    );
    fireEvent(getByTestId('textInput'), 'focus', {})
    fireEvent(getByTestId('textInput'), 'blur', {})
    fireEvent(getByTestId('textInput'), 'focus', {})
    fireEvent(getByTestId('textInput'), 'blur', {})

    expect(mockOnFocus).toHaveBeenCalledTimes(2)
    expect(mockOnBlur).toHaveBeenCalledTimes(2)

  });

  it('Should display error text if error pop is provided', () => {
    const {getByTestId} = render(
      <Input
        value=''
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
        onChangeText={mockOnChangeText}
        placeholder="Enter text"
        error="This is an error"
      />,
    );
    expect(getByTestId('errorText')).toHaveTextContent("This is an error")

  });

  it('Should call onFocus and setFocus on input focus', () => {
    const {getByTestId} = render(
      <Input
        value=''
        onFocus={mockOnFocus}
        onChangeText={mockOnChangeText}
        placeholder="Enter text"
      />,
    );
    // act is used for state
    act(() => {
        fireEvent(getByTestId('textInput'), 'focus', {})
    })

    expect(mockOnFocus).toHaveBeenCalled()

  });
  it('Should call onBlur', () => {
    const {getByTestId} = render(
      <Input
        value=''
        onFocus={mockOnFocus}
        onChangeText={mockOnChangeText}
        placeholder="Enter text"
      />,
    );
    // act is used for state
    act(() => {
        fireEvent(getByTestId('textInput'), 'blur', {})
    })

    expect(mockOnFocus).toHaveBeenCalled()

  });

  it('Should apply disable style', () => {
    const {getByTestId} = render(
      <Input
        value=''
        onFocus={mockOnFocus}
        onChangeText={mockOnChangeText}
        placeholder="Enter text"
        disabled
      />,
    );
    const inputContainer = getByTestId('parent')
    expect(inputContainer).toHaveStyle({pointerEvents : "none"})
    
    const textInput = getByTestId('textInput')
    expect(textInput.props.editable).toBe(false)
  });

  it('Should call defult focus function when not provided', () => {
    const {getByTestId} = render(
      <Input
        value=''
        onChangeText={mockOnChangeText}
        placeholder="Enter text"
      />,
    );
    act(() => {
        fireEvent(getByTestId('textInput'), 'focus', {})
    })
  });

  it('Should call defult onBlur function when not provided', () => {
    const {getByTestId} = render(
      <Input
        value=''
        onChangeText={mockOnChangeText}
        placeholder="Enter text"
      />,
    );
    act(() => {
        fireEvent(getByTestId('textInput'), 'blur', {})
    })
  });
});
