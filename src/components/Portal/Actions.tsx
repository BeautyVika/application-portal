import React, {FC} from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import {DeleteModals} from "../../components/Modals/DeleteModals";

type ActionsPropsType = {
    appId: string
    appName: string
}

export const Actions: FC<ActionsPropsType> = ({appId,appName}) => {

    return (
        <div style={{marginRight: '14px'}}>
            <BorderColorIcon style={{marginRight: '8px'}}/>
            <DeleteModals appId={appId} appName={appName}/>
        </div>
    )
}