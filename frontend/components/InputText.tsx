import { TextInput, Text } from 'react-native-paper';
import { InputTextProps } from '../types';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { colorError } from '../styles/Colors';

const InputText = ({ value, label, placeholder, error, disable, onChange, type }: InputTextProps) => {

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
      {error && <Text style={{color: colorError}} variant="labelLarge">{error}</Text>}
    </>

  );
};

export default InputText;