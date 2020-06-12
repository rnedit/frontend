import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Copyright (){
    const { t } = useTranslation();
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {t("АвторскиеПрава.1")}
            <Link color="inherit" href="https://www.facebook.com/slava.petkov">
                Petkov Vyacheslav
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}