import { test, expect } from '@playwright/test';

import SetupWizard from './utils/pageobjects/wizard.page';
import { adminRegister, VALID_EMAIL } from './utils/mocks/userAndPasswordMock';
import { LOCALHOST, setupWizardStepRegex } from './utils/mocks/urlMock';
import { HOME_SELECTOR } from './utils/mocks/waitSelectorsMock';

test.describe('[Wizard]', () => {
	let setupWizard: SetupWizard;
	test.beforeEach(async ({ page }) => {
		setupWizard = new SetupWizard(page);
	});
	test.describe('[Step 1]', () => {
		test.beforeEach(async ({ baseURL }) => {
			const baseUrl = baseURL || LOCALHOST;
			await setupWizard.goto(baseUrl);
		});

		test('expect required field alert showed when user dont inform data', async () => {
			await setupWizard.stepOneFailedBlankFields();
		});

		test('expect alert showed when email provided is invalid', async () => {
			await setupWizard.stepOneFailedWithInvalidEmail(adminRegister);
		});

		test('expect go to Step 2 successfully', async () => {
			await setupWizard.stepOneSucess(adminRegister);

			await expect(setupWizard.getPage()).toHaveURL(setupWizardStepRegex._2);
		});
	});

	test.describe('[Step 2]', async () => {
		test.beforeEach(async ({ baseURL }) => {
			const baseUrl = baseURL || LOCALHOST;
			await setupWizard.goto(baseUrl);
			await setupWizard.stepOneSucess(adminRegister);
		});

		test('expect required field alert showed when user dont inform data', async () => {
			await setupWizard.stepTwoFailedWithBlankFields();
		});

		test('expect go to Step 3 successfully', async () => {
			await setupWizard.stepTwoSucess();
			await expect(setupWizard.getPage()).toHaveURL(setupWizardStepRegex._3);
		});
	});

	test.describe('[Step 3]', async () => {
		test.beforeEach(async () => {
			await setupWizard.goto('');
			await setupWizard.stepOneSucess(adminRegister);
			await setupWizard.stepTwoSucess();
		});

		test('expect have email field to register the server', async () => {
			await expect(setupWizard.registeredServer()).toBeVisible();
		});

		test('expect start "Register" button disabled', async () => {
			await expect(setupWizard.registerButton()).toBeDisabled();
		});

		test('expect show an error on invalid email', async () => {
			await setupWizard.stepThreeFailedWithInvalidField();
		});

		test('expect enable "Register" button when email is valid and terms checked', async () => {
			await setupWizard.registeredServer().type(VALID_EMAIL);
			await setupWizard.agreementField().click();
			await expect(setupWizard.registerButton()).toBeEnabled();
		});

		test('expect have option for standalone server', async () => {
			await expect(setupWizard.standaloneServer()).toBeVisible();
		});
	});

	test.describe('[Final Step]', async () => {
		test.beforeEach(async () => {
			await setupWizard.goto('');
			await setupWizard.stepOneSucess(adminRegister);
			await setupWizard.stepTwoSucess();
			await setupWizard.stepThreeSucess();
		});

		test('expect confirm the standalone option', async () => {
			await expect(setupWizard.goToWorkspace()).toBeVisible();
			await expect(setupWizard.standaloneConfirmText()).toBeVisible();
		});

		test('expect confirm standalone', async () => {
			await setupWizard.goToWorkspace().click();
			await setupWizard.waitForSelector(HOME_SELECTOR);
		});
	});
});