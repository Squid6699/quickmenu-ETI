import { TextInput } from 'react-native-paper';
import { InputTextProps } from '../types';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

const InputText = ({value, label, placeholder, error, errorMsg, disable, onChange}: InputTextProps) => {

  const handleInputOnchange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = event.nativeEvent.text;
    onChange(value);
  }


  return (
    <TextInput
      label = {label}
      value={value}
      onChange={handleInputOnchange}
    />
  );
};

export default InputText;