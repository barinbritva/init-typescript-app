import fs from 'fs';
import inquirer, {ChoiceOptions, QuestionCollection} from 'inquirer';
import AppConfig from './AppConfig';
import ConfigProperty from './ConfigProperty';
import License from './License';
import licenses from './licenses';

export default class AppConfigurator {
	public async askUser(): Promise<AppConfig> {
		const questions: QuestionCollection = [
			{
				type: 'input',
				name: ConfigProperty.Name,
				message: 'Project name:',
				validate(input: string): boolean | string {
					if (input.length === 0) {
						return 'Project name can not be empty.';
					}

					if (fs.existsSync(input)) {
						return `Folder with name "${input}" already exists.`;
					}

					return true;
				}
			},
			{
				type: 'list',
				name: ConfigProperty.NpmPackage,
				message: 'Project type:',
				choices: [
					{
						name: 'npm package',
						value: true
					},
					{
						name: 'some app',
						value: false
					}
				]
			},
			{
				type: 'list',
				name: ConfigProperty.License,
				message: 'Choose license:',
				suffix: '\nSelect "None" if don\'t care.',
				choices: this.generateLicenseOptions(),
				loop: false
			},
			{
				type: 'input',
				name: ConfigProperty.Author,
				message: 'Author name:',
				suffix: '\nFor using in license agreement.\n',
				when: (answers: Partial<AppConfig>) => {
					return answers.license != null;
				},
				validate(input: string): boolean | string {
					if (input.length === 0) {
						return 'Author name can not be empty if a license chosen.';
					}

					return true;
				}
			},
			{
				type: 'list',
				name: ConfigProperty.TsAdvanced,
				message: 'Base or Advanced type checking:',
				suffix: '\nBase is recommended for beginners in TypeScript.',
				choices: [
					{
						name: 'Base type checking',
						value: false
					},
					{
						name: 'Advanced type checking',
						value: true
					}
				]
			}
		];

		const config: AppConfig = await inquirer.prompt<AppConfig>(questions);

		if (config.author == null) {
			config.author = '';
		}

		return config;
	}

	private generateLicenseOptions(): ChoiceOptions[] {
		const options: ChoiceOptions[] = licenses.map((license: License) => {
			return {
				name: license.name,
				value: license
			};
		});
		options.unshift({
			name: 'None',
			value: null
		});

		return options;
	}
}
