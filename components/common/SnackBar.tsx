import Button from '@material-ui/core/Button';

export default async function sendMessage(hook, message, category, closeAction) {
    hook(
        message,
        {
            variant: category,
            autoHideDuration: 3000,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
            action: (
                <Button color="primary" size="small" onClick={() => closeAction()} style={{color: "#fff"}}>
                    Dismiss
                </Button>
            ),

        }
    );
}
