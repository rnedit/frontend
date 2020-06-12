import React,{useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const currencies = [
  {
    value: 'ru',
    label: 'Русский',
  },
  {
    value: 'en',
    label: 'English',
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '20ch',
      },
    },
  }),
);


function LngSelect() {
  const classes = useStyles();
  const [currency, setCurrency] = useState(localStorage.getItem('i18nextLng')); 

  const { t } = useTranslation();

  function handleClickChangeLang(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrency(event.target.value);
    i18next.changeLanguage(event.target.value);
};

  return (
    <form className={classes.root} noValidate autoComplete="off">   
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label={t('ВыборЯзыка.1')}
          value={currency}
          onChange={handleClickChangeLang}
          helperText={t('ВыборЯзыка.2')}
          variant="outlined"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </form>
  );
}
export default LngSelect;