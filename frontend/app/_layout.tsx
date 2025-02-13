import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{
                title: 'Profile', 
                tabBarIcon:() => <MaterialCommunityIcons name="face-man-profile" size={24} color="black" />}}/>
            <Tabs.Screen name="Documents" options={{
                title: 'Documents',
                tabBarIcon:() => <MaterialCommunityIcons name="file-document-multiple" size={24} color="black" />}}/>
            <Tabs.Screen name="UserSettings" options={{
                title: 'User Settings',
                tabBarIcon: () => <Ionicons name="settings" size={24} color="black" />}}/>
        </Tabs>
    );
}