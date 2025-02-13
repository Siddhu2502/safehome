import { View, StyleSheet, Text, ScrollView, } from "react-native";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import PieChart from 'react-native-pie-chart'


type PropsUser = {
    username: string;
    useraddress: string;
    userpincode: string;
};

type PropsAnalytics = {
    mocktasks: { id: number, title: string; status: string; hours: number }[];
};

type PropsTask = {
    task: { id: number, title: string; status: string; hours: number };
};

type PropsTaskList = {
    mocktasks: { id: number, title: string; status: string; hours: number }[];
};


const mockTasks = [
    { id: 1, title: 'Review Project Proposal', status: 'ongoing', hours: 12 },
    { id: 2, title: 'Client Meeting Preparation', status: 'ongoing', hours: 8 },
    { id: 3, title: 'Documentation Update', status: 'pending', hours: 5 },
    { id: 4, title: 'Team Sync', status: 'pending', hours: 3 },
    { id: 5, title: 'Code Review', status: 'completed', hours: 10 },
    { id: 6, title: 'Design Mockups', status: 'completed', hours: 7 },
    { id: 7, title: 'User Testing', status: 'ongoing', hours: 6 },
    { id: 8, title: 'Bug Fixing', status: 'pending', hours: 4 },
    { id: 9, title: 'Project Deployment', status: 'completed', hours: 9 },
];

  const User = ({ username, useraddress, userpincode }: PropsUser) => {
    const imageexists = false;

    return (
        <View style={styles.userCard}>
            <View style={[styles.userAvatar, imageexists ? styles.userAvatar : styles.placeholderLogo]}>
                <Text style={styles.placeholderText}>
                    {username[0].toUpperCase()}
                </Text>
            </View>
            <View style={styles.textContainer}> 
                <Text style={styles.userName}> {username} </Text>
                <Text style={styles.userAddress}> {useraddress} </Text>
                <Text style={styles.userPincode}> {userpincode} </Text>
            </View>
        </View>
    );
};

const Analytics = ({ mocktasks }: PropsAnalytics) => {

    // example of a mock task
    // { id: 1, title: 'Review Project Proposal', status: 'ongoing', hours: 12 },

    const countStatus = (status: string) => {
        return mocktasks.filter((task) => task.status === status).length;
    }

    const total_number_of_tasks = mocktasks.length;
    const tasks_marked_done = countStatus('completed');
    const tasks_marked_ongoing = countStatus('ongoing');
    const tasks_marked_pending = countStatus('pending');

    const done = (tasks_marked_done / total_number_of_tasks) * 100;
    const ongoing = (tasks_marked_ongoing / total_number_of_tasks) * 100;
    const pending = (tasks_marked_pending / total_number_of_tasks) * 100;


    const colorsseries = [
        { value: done, color: '#F44336' },
        { value: ongoing, color: '#2196F3' },
        { value: pending, color: '#4CAF50' },
    ];


    return (
        <View style={styles.analyticsCard}>
            <Text style={styles.analyticsHeader}>Progress Analytics</Text>
            <View style={styles.analyticsContent}> 
                <PieChart widthAndHeight={200} series={colorsseries} cover={0.60} />
                <View style={styles.analyticsTextContainer}> 
                    <View style={styles.analyticsRow}> 
                        <Text style={styles.analyticsLabel}>Done:</Text>
                        <Text style={styles.analyticsValue}>{done.toFixed(1)}%</Text> 
                    </View>
                    <View style={styles.analyticsRow}> 
                        <Text style={styles.analyticsLabel}>WIP:</Text>
                        <Text style={styles.analyticsValue}>{ongoing.toFixed(1)}%</Text> 
                    </View>
                    <View style={styles.analyticsRow}> 
                        <Text style={styles.analyticsLabel}>Pending:</Text>
                        <Text style={styles.analyticsValue}>{pending.toFixed(1)}%</Text> 
                    </View>
                </View>
            </View>
        </View>
    );
};


const TaskCard = ({ task }: PropsTask) => {
    let statusIcon: 'check-circle' | 'timelapse' | 'pending-actions' | 'help-outline';
    let iconColor;
  
    switch (task.status) {
      case 'completed':
        statusIcon = 'check-circle';
        iconColor = '#4CAF50'; // Green
        break;
      case 'ongoing':
        statusIcon = 'timelapse';
        iconColor = '#FFC107'; // Amber
        break;
      case 'pending':
        statusIcon = 'pending-actions';
        iconColor = '#F44336'; // Red
        break;
      default:
        statusIcon = 'help-outline'; // Default icon
        iconColor = '#777';
    }
  
    return (
      <View style={styles.taskCard}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle}>
            <FontAwesome5 name="tasks" size={16} color="#333" /> {task.title}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: iconColor , flexDirection : 'row', alignItems: 'center'}]}>
            <MaterialIcons name={statusIcon} size={16} color="white" />
            {/* <Text style={styles.statusText}> {task.status}</Text> */}
          </View>
        </View>
        <Text style={styles.taskHours}>
          <Ionicons name="time-outline" size={14} color="#777" /> {task.hours} hours
          spent
        </Text>
      </View>
    );
  };
  
  const Tasks = ({ mocktasks }: PropsTaskList) => {
    return (
      <View style={styles.taskContainer}>
        <Text style={styles.tasksHeader}>
          <FontAwesome5 name="list-ul" size={20} color="#333" /> Every Task That is Undergoing
        </Text>
        <ScrollView contentContainerStyle={styles.taskScrollViewContent}>
          {mocktasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </ScrollView>
      </View>
    );
  };
  


export default function index() {
    return (
        <ScrollView>
            <User username="Siddharth D" useraddress="123 POndicherry" userpincode="12345" />
            <Analytics mocktasks={mockTasks} />
            <Tasks mocktasks={mockTasks} />
        </ScrollView>
    );
}




const styles = StyleSheet.create({

    // for user part
    userCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        elevation: 3, // For Android shadow
        flexDirection: 'row',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1, 
        marginLeft: 20,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
    userAddress: {
        fontSize: 18,
        color: '#777',
        marginTop: 5,
    },
    userPincode: {
        fontSize: 16,
        color: '#888',
        marginTop: 5,
    },
    userAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderLogo: {
        backgroundColor: '#007AFF', // Example color
    },
    placeholderText: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    },


    // for the Analytics part
    analyticsCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    analyticsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15, // Space below the header
    },
    analyticsContent: {  // New: Container for PieChart and text
        flexDirection: 'row', // Arrange horizontally
        alignItems: 'center',   // Vertically align
        justifyContent: 'space-between',
    },
    analyticsTextContainer: { // New: Container for the text
        marginLeft: 20, // Space between PieChart and text
    },
    analyticsRow: {    // New: Style for each row (Completed/Not Completed)
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,   // Space between rows
    },
    analyticsLabel: {  // New: Style for the labels (Completed, Not Completed)
        fontWeight: 'bold',
        marginRight: 5,
    },


    // for the TaskCard part
    taskCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        elevation: 1,
        marginBottom: 10,
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ongoingBadge: {
        backgroundColor: '#FFC107', // Amber
    },
    pendingBadge: {
        backgroundColor: '#9E9E9E', // Grey
    },
    statusBadge: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 4,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
    },
    taskHours: {
        fontSize: 14,
        color: '#777',
    },
    analyticsValue: {
        color: '#333',
    },


    
    // for the Task part
    taskContainer: {  // Style for the outer container
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        elevation: 3,
    },
    tasksHeader: { // Style for the heading
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15, // Space below the heading
        color: '#333', // Darker text color
    },
    taskScrollViewContent: { // Style for the content inside the ScrollView
        paddingBottom: 15, // Add padding at the bottom of the scroll view
    },

});

