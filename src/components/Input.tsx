import { TextInput, StyleSheet } from 'react-native'

import { View, Text } from "./Themed"
import { AntDesign } from '@expo/vector-icons';
import { UserData } from 'lib/types';

interface InputProps {
    label: string;
    value: string;
    placeholder: string;
    setValue: React.Dispatch<React.SetStateAction<UserData>>;
}

export default function Input({ label, placeholder, value, setValue }: InputProps) {
    return (
        <View>
            <Text weight='medium'>{label}</Text>
            <View
                style={styles.inputContainer}
            >
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="rgb(125,125,125)"
                    value={value}
                    autoCapitalize="none"
                    onChangeText={(text: string) => setValue(prev => ({ ...prev, username: text.trim() }))}
                />
                <AntDesign name="user" size={24} color="rgb(125,125,125)" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        width: "90%",
        borderColor: '#EDEDED',
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: "#F4F5F7"
    },
    input: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#000",
        flex: 1,
    },
    label: {

    }
})
