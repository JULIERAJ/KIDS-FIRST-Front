import * as Yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const currentYear = new Date().getFullYear();

export const kidValidateSchema = Yup.object().shape({
  ProfilePicture: Yup.mixed().test(
    'file formant',
    'Unsupported Format',
    (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
  ),
  fullName: Yup.string()
    .min(2, 'The field accepts a minimum of 2 characters')
    .max(40, 'The field accepts a maximum of 40 characters')
    .matches(
      /^[a-zA-Z\s-]+$/,
      'The field accepts letters and only special characters [-] and white space [ ]'
    )
    .required('Full Name is required'),
  dateOfBirth: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])[/](0[1-9]|[12][0-9]|3[01])[/](19|20)\d{2}$/,
      'The format of the birthday is month, day, and year, i.e., [MM/DD/YYYY]'
    )
    .required('Date Of Birth Required')
    .test('in-past', 'The date must be in the past', (value) => {
      const [month, day, year] = value.split('/');
      const inputDate = new Date(year, month - 1, day);
      return inputDate < new Date();
    })
    .test(
      'year-range',
      'The year must be between 1930 and the current year',
      (value) => {
        const year = value.split('/')[2];
        const inputDate = parseInt(year, 10);
        return inputDate >= 1930 && inputDate <= currentYear;
      }
    ),
  others: Yup.string().max(
    250,
    'The field accepts a maximum of 200 characters'
  ),
});
