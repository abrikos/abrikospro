import React from 'react'
import {useSelector} from 'react-redux'
import {Alert} from "react-bootstrap";

export function AlertsList() {
    const alerts = [...useSelector(state => state.alerts)]

    return (
        <div>
            {alerts.reverse().slice(0,3).map((a, i) => <Alert variant={a.variant} key={i}>{a.date} {a.text}</Alert>)}
        </div>
    )
}