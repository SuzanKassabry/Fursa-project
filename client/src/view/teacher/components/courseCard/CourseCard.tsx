import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../../../app/hooks';
import { select } from '../../../../app/reducers/teacher/CourseCardSlice';
import './CourseCard.scss';

interface CourseCardProps {
    info: {
        id: number
        name: string
        class_name: string
        class_id:number
        teacher_id:string
    }

}

export default function CourseCard(props: CourseCardProps) {
    // console.log(props)
    const { name, class_name, id, class_id, teacher_id } = props.info;
    // console.log(name)
    // console.log(class_name)
    // console.log(id)
    // console.log(class_id)
    // console.log(teacher_id)
    const dispatch = useAppDispatch();

    function handleClick(){
        dispatch(select([name, class_name, id, class_id, teacher_id]));
    }
    
    return (
        <Card className='card' style={{ display: 'inline-block' }} onClick={handleClick}>
            <CardContent className='content'>
                <Typography variant='h6' align='center'>{name}</Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" align='center'>{class_name}</Typography>
            </CardContent>
        </Card>
    );
}
