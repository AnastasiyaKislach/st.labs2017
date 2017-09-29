using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using System.Web.Mvc;

namespace FilmGallery.Attributes {

	public class EmailRegexAttribute : ValidationAttribute, IClientValidatable {

		public EmailRegexAttribute(string errorMessage)
			: base(errorMessage) {
		}

		protected override ValidationResult IsValid(object value, ValidationContext validationContext) {
			ValidationResult validationResult = ValidationResult.Success;
			try {
				string valueAsString = value as string;
				bool isValid = valueAsString != null;

				if (!isValid) {
					return new ValidationResult(ErrorMessageString);
				}

				const string patternRFC =
					@"(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])";

				const string checkDomain = @"\b@tut.by$\b";

				bool isValidEmail = (new Regex(patternRFC, RegexOptions.IgnoreCase)).Match(valueAsString).Length > 0;

				if (!isValidEmail) {
					return new ValidationResult("Email is incorrect.");
				}

				bool isEmailHasTutByDomain = (new Regex(checkDomain, RegexOptions.IgnoreCase)).Match(valueAsString).Length > 0;

				if (!isEmailHasTutByDomain) {
					return new ValidationResult("Email should have tut.by domain.");
				}
			} catch (Exception ex) {
				throw ex;
			}

			return validationResult;
		}
		public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ModelMetadata metadata, ControllerContext context) {
			string errorMessage = ErrorMessageString;

			ModelClientValidationRule emailRegex = new ModelClientValidationRule {
				ErrorMessage = errorMessage,
				ValidationType = "emailregex"
			};

			yield return emailRegex;
		}
	}
}