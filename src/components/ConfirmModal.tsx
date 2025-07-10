import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../styles/colors';

type Props = {
  visible: boolean;
  isShownOneButtonOnly?: boolean;
  title?: string;
  message?: string | React.ReactNode;
  textCancel?: string;
  textConfirm?: string;

  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmModal = ({
  visible,
  isShownOneButtonOnly = false,
  title = 'Confirm',
  message = '',
  textCancel = 'Cancel',
  textConfirm = 'OK',
  onCancel,
  onConfirm,
}: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex flex-1 items-center justify-center  bg-black/20">
        <View className="bg-white w-[70%] h-[150px] min-h-[150px] max-h-[200px]  shadow-lg rounded-xl overflow-hidden">
          <View className=" h-[60%] gap-3 p-4 justify-center items-center ">
            <Text className="font-bold text-xl text-center">{title}</Text>
            {message && (
              <Text style={{color: Colors.muted, fontSize: 12}}>{message}</Text>
            )}
          </View>

          <View className="flex-1 w-full flex-row items-center justify-between border-t-[0.5px] border-t-gray-300">
            <TouchableOpacity
              onPress={onCancel}
              className={` justify-center items-center border-r-[0.5px] border-r-gray-300 h-full ${
                isShownOneButtonOnly ? 'w-full' : 'w-1/2'
              }`}>
              <Text
                className="text-[17px] font-bold "
                style={{color: Colors.subdued}}>
                {textCancel}
              </Text>
            </TouchableOpacity>
            {!isShownOneButtonOnly && (
              <TouchableOpacity
                onPress={onConfirm}
                className="w-1/2  h-full justify-center items-center ">
                <Text
                  className="text-[17px] font-bold "
                  style={{color: Colors.primary}}>
                  {textConfirm}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
