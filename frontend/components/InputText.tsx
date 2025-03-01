import { TextInput, Text } from 'react-native-paper';
import { InputTextProps } from '../types';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

const InputText = ({ value, label, placeholder, error, errorMsg, disable, onChange, type }: InputTextProps) => {

  const handleInputOnchange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = event.nativeEvent.text;
    onChange(value);
  }


  return (
    <>
      <TextInput
        label={label}
        value={value}
        onChange={handleInputOnchange}
        placeholder={placeholder}
        disabled={disable}
        secureTextEntry={type === "password" ? true : false}
      />
      {error && <Text variant="labelSmall">{errorMsg}</Text>}
    </>

  );
};

export default InputText;