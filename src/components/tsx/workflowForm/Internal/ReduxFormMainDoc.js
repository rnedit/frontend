import React from 'react'
import { Field, reduxForm, formValueSelector} from 'redux-form'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import asyncValidateEmail from '../Validators/asyncValidateEmail'
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import DialogListAddProfile from '../../dialog/DialogListAddProfile'
import { setUpdateRecipient } from "../../../../reducers/internal"
import submit from './submit'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'favoriteColor',
    'notes'
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}



const renderTextField = ({
  label,
  id,
  variant,
  input,
  disabled,
  margin,
  meta: { touched, invalid, error },
  ...custom
}) => (
    <TextField
      id={id}
      label={label}
      variant={variant}
      margin={margin}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      disabled={disabled}
      {...input}
      {...custom}
    />
  )

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
)

const radioButton = ({ input, typeAgreement, ...rest }) => (
  <FormControl>
    <RadioGroup {...input} {...rest}>
      <FormControlLabel checked={Number(typeAgreement) === 0} value="0" control={<Radio />} label="Без согласования" />
      <FormControlLabel checked={Number(typeAgreement) === 1} value="1" control={<Radio />} label="Параллельное" />
      <FormControlLabel checked={Number(typeAgreement) === 2} value="2" control={<Radio />} label="Последовательное" />
    </RadioGroup>
  </FormControl>
)

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
    <FormControl
      error={(touched && (typeof error !== "undefined"))}>
      <InputLabel htmlFor="typeAgreement-native-simple">Тип согласования</InputLabel>
      <Select
        native
        {...input}
        {...custom}
        inputProps={{
          name: 'typeAgreements',
          id: 'typeAgreements-native-simple'
        }}
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  )
  const HiddenFileds = [
    "id",
    "draft",
    "сreatorUserId",
    "сreatorProfileId",
    "сreatorRolesId",
    "attachmentNames",
    "attachments",
    "version",
  ]

    
  
let InitializeFromStateForm = props => {
  const { handleSubmit, pristine, reset, submitting, classes,
    typeAgreement,
    profileRecipientUserName,
    profileRecipientName} = props

  const callBackInternal = (data) => {
    if (data.length > 0)
      props.setUpdateRecipient(data[0])
  }

  
  const DrawHiddenFields =()=> {
      
    return (
      HiddenFileds.map((oName, i) => (
        <div key={oName}>
          <Field
            name={oName}
            id={oName}
            variant="outlined"
            margin="dense"
            component={renderTextField}
            label={oName}
            disabled
          />
          <Divider />
        </div>
        )
      )
    )

  }

  return (
    <form onSubmit={handleSubmit}>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography component="div" style={{
            margin: '5px'
          }} >

            <Field
              id="subject"
              name="subject"
              variant="outlined"
              margin="dense"
              component={renderTextField}
              label="Краткое содержание"
              fullWidth
            />

          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography component="div" style={{
            margin: '5px'
          }} >
            <Box display="flex" justifyContent="right">
              <DialogListAddProfile type="Internal" multiple={false} callBackInternal={callBackInternal} />
            </Box>
            <Field
              id="recipientName"
              name="recipientName"
              value={profileRecipientName}
              variant="outlined"
              margin="dense"
              component={renderTextField}
              label="Получатель"
              disabled
              fullWidth
            />

          </Typography>
        </Grid>
      </Grid>

      <Typography component="div" hidden style={{
        margin: '5px'
      }} >

        <Field
          name="recipient"
          id="recipient"
          variant="outlined"
          margin="dense"
          component={renderTextField}
          label="Получатель ID"
          disabled
          fullWidth
        />

      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography component="div" style={{
            margin: '5px'
          }} >

            <Field name="typeAgreement"
                    typeAgreement={typeAgreement}
                    component={radioButton}>
              <Radio value="0" label="Без согласования" />
              <Radio value="1" label="Параллельное" />
              <Radio value="2" label="Последовательное" />
            </Field>

          </Typography>
        </Grid>
      </Grid>

   
        <DrawHiddenFields/>

    

    </form>
  )
}

InitializeFromStateForm = reduxForm({
  form: 'InternalForm',  // a unique identifier for this form
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmit: submit,
  validate,
  asyncValidateEmail
})(InitializeFromStateForm)

const selector = formValueSelector('InternalForm')

InitializeFromStateForm = connect(

  state => ({
    initialValues: state.internal, // pull initial values from reducer
    typeAgreement: selector(state, 'typeAgreement'),
    profileRecipientName: selector(state, 'profileRecipient.name'),
    profileRecipientUserName: selector(state, 'profileRecipient.user.username'),
  }), { 
    setUpdateRecipient
   }
  //{ load: loadAccount }               // bind account loading action creator
)(InitializeFromStateForm)

export default InitializeFromStateForm