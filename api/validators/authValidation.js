const { check, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    // email must be a valid email
    check('email').isEmail().normalizeEmail().escape(),
    check('name').not().escape().trim(),
    check('regNumber').not().escape().trim(),
    // password must be at least 5 chars long
    check('password').not().trim(),
  ]
}

const loginValidationRules = () => {
  return [
    // email must be a valid email
    check('email').isEmail().normalizeEmail().escape(),
    // password must be at least 5 chars long
    check('password').not().isLength({ max: 5 }).escape().trim(),
  ]
}
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  loginValidationRules,
  validate,
}