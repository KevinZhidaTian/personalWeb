import { Box } from '@mui/material';
import * as React from 'react';
import { CustomTabPanel } from './CustomTabPanel';

export const AboutMe = (props: any) => {
return(
    <CustomTabPanel value={props.value} index={props.index}>
         <Box sx={{
        backgroundColor: 'white',
        width: '60vw',
    }}>
        About Me
    </Box>
    </CustomTabPanel>
   
)
}