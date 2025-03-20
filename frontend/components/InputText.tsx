import { useState } from 'react';
import { TextInput, Text } from 'react-native-paper';
import { InputTextProps } from '../types';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useCustomColors } from '../hook/useCustomColors';

const InputText = ({ value, label, placeholder, error, disable, onChange, type = "text" }: InputTextProps) => {
  const { colors } = useCustomColors();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInputOnchange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = event.nativeEvent.text;
    onChange(value);
  };

  return (
    <>
      <TextInput
        label={label}
        value={value !== undefined ? String(value) : undefined}
        onChange={handleInputOnchange}
        placeholder={placeholder}
        disabled={disable}
        secureTextEntry={type === "password" && !isPasswordVisible}
        keyboardType={type === "number" ? "numeric" : undefined}
        mode="outlined"
        multiline={type === "textarea"}
        numberOfLines={type === "textarea" ? 5 : 1}
        right={
          type === "password" ? (
            <TextInput.Icon
              icon={isPasswordVisible ? "eye-off" : "eye"}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          ) : undefined
        }
        activeOutlineColor={colors.textColor}
      />
      {error && <Text style={{ color: colors.colorError }} variant="labelLarge">{error}</Text>}
    </>
  );
};

export default InputText;
