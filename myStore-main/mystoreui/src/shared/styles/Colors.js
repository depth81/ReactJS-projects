import { makeStyles } from "@material-ui/core";

const primaryColor = 'green';

const Colors = makeStyles({
    btnPrimary: {
        color: 'white',
        backgroundColor: "#B3EEE9",
    },
    btnDanger:{
        color: 'white',
        backgroundColor: 'red',
    }
})
export {Colors, primaryColor};