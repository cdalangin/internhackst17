import { StyleSheet, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EEDCFD",
        width: windowWidth
    },
    box: {
        height: windowHeight / 1.2,
        width: windowWidth - 10,
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        color: '#9A76A5',
        display: "flex",
        alignSelf: "center",
        fontWeight: "bold"
    },
    text: {
        color: '#9A76A5',
        fontSize: 25
    },
    inputDate: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: windowWidth - 30,
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: "#fffbee",
        marginTop: 10,
        width: windowWidth - 30,
        marginBottom: 10,
        paddingLeft: 16
    },
    buttonAdd: {
        backgroundColor: '#9A76A5',
        marginTop: 10,
        marginBottom: 10,
        height: 48,
        borderRadius: 5,
        width: windowWidth - 30,
        alignItems: "center",
        justifyContent: 'center',
        padding: 10
    },
    button: {
        backgroundColor: '#9A76A5',
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        padding: 10
    },
    buttonTitle: {
        color: '#EEDCFD',
        fontSize: 16,
        fontWeight: "bold"
    },
    pickertext: {
        color: '#9A76A5',
        fontSize: 10,
        marginTop: 10,

    },
    picker: {
        // backgroundColor: '#9A76A5',
        // marginTop: 20,
        color: '#9A76A5',
        height: 48,
        borderRadius: 5,
        width: windowWidth - 30,
        alignItems: "center",
        justifyContent: 'center',
        padding: 10
    },

    nextView: {
        display: "flex",
        alignSelf: "flex-end",
        marginRight: 10
    },
    next: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: windowWidth / 3.2,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: "#fffbee",
        padding: 10,
        borderRadius: 10,
    },
    nexttext: {
        fontSize: 20,
        color: "#9A76A5",
    }
})