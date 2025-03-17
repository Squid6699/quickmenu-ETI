import { TextInput, Text } from 'react-native-paper';
import { InputTextProps } from '../types';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useCustomColors } from '../hook/useCustomColors';

const InputText = ({ value, label, placeholder, error, disable, onChange, type="text" }: InputTextProps) => {

  const { colorError } = useCustomColors();

  const handleInputOnchange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = event.nativeEvent.text;
    onChange(value);
  }


  return (
    <>
      <TextInput
        label={label}
        value={value !== undefined ? String(value) : undefined}
        onChange={handleInputOnchange}
        placeholder={placeholder}
        disabled={disable}
        secureTextEntry={type === "password" ? true : false}
        keyboardType={type === "number" ? "numeric" : undefined}
        mode='outlined'
        multiline={type === "textarea" ? true : false}
        numberOfLines={type === "textarea" ? 5 : 1}
      />
      {error && <Text style={{color: colorError}} variant="labelLarge">{error}</Text>}
    </>

  );
};

export default InputText;