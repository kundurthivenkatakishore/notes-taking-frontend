import React from 'react'

export const Alert = (variant, message) => {
    return (
        <Alert key={variant} variant={variant}>
            {message}
        </Alert>
    )
}
