import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../../../app/hooks';
import { select } from '../../../../app/reducers/teacher/ClassCardSlice';
import './ClassCard.scss';

interface classProps{
    class_name:string
    id:number
}

export default function CourseCard(props:classProps) {
    const {class_name, id}= props;
    const dispatch = useAppDispatch();

    function handleClick() {
        dispatch(select([class_name, id]));
    }
    return (
        <Card className='card' style={{ display: 'inline-block' }} onClick={handleClick}>
            <CardContent className='content'>
                <Typography variant='h6' align='center'>{class_name}</Typography>
            </CardContent>
        </Card>
    );
}
