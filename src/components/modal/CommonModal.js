import { Modal, TouchableOpacity } from "react-native"
import Toast from "react-native-toast-message"

const CommonModal =({visible,onClose=()=>{},children})=>{
    return(
        <Modal transparent visible={visible}  onRequestClose={onClose}  >
            <TouchableOpacity activeOpacity={1} style={{
                flex : 1, 
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center"
            }} onPress={onClose} >
                <TouchableOpacity activeOpacity={1} style={{width: "95%",padding: 15,borderRadius: 10,backgroundColor: "white"}} >
{children}
                </TouchableOpacity>
                <Toast />
            </TouchableOpacity>
        </Modal>
    )
}

export default CommonModal