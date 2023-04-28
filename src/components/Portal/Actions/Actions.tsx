import React, {FC} from 'react'

import {DeleteModals} from "../../Modals/DeleteModals";
import {EditModals} from "../../Modals/EditModals";

type ActionsPropsType = {
    appId: string
    appName: string
    appDescription: string
    appDate: Date
}

export const Actions: FC<ActionsPropsType> = ({appId, appName, appDescription, appDate}) => {

    return (
        <div style={{marginRight: '14px'}}>
            <EditModals appId={appId}
                        appName={appName}
                        appDescription={appDescription}
                        appDate={appDate}/>
            <DeleteModals appId={appId} appName={appName}/>
        </div>
    )
}