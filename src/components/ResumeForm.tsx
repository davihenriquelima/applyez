import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountriesProvider, useCountriesCtx} from "@/contexts/CountriesProvider";
import { FormData, resumeSchema } from "@/schemas/resumeSchema";
import { maskCpf, maskDate, maskPhoneNumber, maskZipCode } from "@/masks/masks";
import { useState } from "react";
import React from "react";

const ResumeForm = ()=> {

    const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
		defaultValues: {
			dependents: [{response:'', quantity:0}],
			skills:[]
		},
     	resolver: zodResolver(resumeSchema),
    });

	const countriesCtx = useCountriesCtx();

    const onSubmit:SubmitHandler<FormData> = (data) =>{
    	console.log(data)
    }

	// dependents
	const {fields, append, remove } = useFieldArray({
		control,
		name:"dependents"
	});

	// skills
	const [skill, setSkill] = useState("");
  	const [skillsList, setSkillsList] = useState<string[]>([]);
	const addSkill = () => {
		if(skill.trim() !== "") {
			setSkillsList((prevSkillslist) => {
				const updatedSkills = [...prevSkillslist, skill.trim()]; // autaliza a lista com a lista anterior + state skill
				setValue('skills', updatedSkills); //atualiza o campo skills
				return updatedSkills; // retorna a lista atualizada
			})
			setSkill(""); 
		}
	}

	const removeSkill = (index:number) => {
		const newSkillsList = skillsList.filter((_, i) => i !== index);
		setSkillsList(newSkillsList);
	};
	
    return (
		
		<div className="w-full max-w-4xl">
			<div className="text-white bg-blue-900 p-4 rounded-md">
				<h1 className="text-center text-xl font-bold uppercase">Edit Your Resume</h1>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				autoComplete="on"
				encType="multipart/form-data"
				className="mt-2"
			>
				<fieldset className="bg-[#f8fbffcc] p-4 rounded-md mb-2">
					<legend className="bg-blue-900 text-white p-2 rounded-md uppercase">personal data</legend>
					<div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 justify-center gap-4">

						<div className="w-full">
							<label htmlFor="name" className="font-bold">Name</label>
							<input
								{...register('name') }
								type="text"
								className={`w-full p-2 border rounded outline-none ${errors.name ? 'border-red-800' : 'border-cyan-950/10'}`}
								placeholder="enter your full name"
							/>
							{errors.name && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.name.message}</p>}	
						</div>

						<div className="w-full">
							<label htmlFor="birthDate" className="font-bold">Birth Date</label>
							<input
								{...register('birthDate', {onChange: e => setValue('birthDate', maskDate(e.target.value), { shouldValidate: true })})}
								type="text"
								className={`w-full p-2 border rounded outline-none ${errors.birthDate ? 'border-red-800' : 'border-cyan-950/10'}`}
								placeholder="dd/mm/yyyy"
							/>
							{errors.birthDate && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.birthDate.message}</p>}
						</div>

						<div className="w-full">
							<label htmlFor="gender" className="font-bold">Gender</label>
							<select
								{...register('gender')}
								className={`w-full p-[10px] border bg-sky-600/20 rounded outline-none ${errors.gender ? 'border-red-800' : 'border-cyan-950/10'}`}
							>	
								<option value=""></option>
								<option value="M">masculine</option>
								<option value="F">feminine</option>
							</select>
							{errors.gender && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.gender.message}</p>}
						</div>

						<div className="w-full">
							<label htmlFor="maritalStatus" className="font-bold">Marital Status</label>
							<select
								{...register('maritalStatus')}
								className={`w-full p-[10px] border bg-sky-600/20 rounded outline-none ${errors.maritalStatus ? 'border-red-800' : 'border-cyan-950/10'}`}
							>
								<option value=""></option>
								<option value="single">single</option>
								<option value="married">married</option>
								<option value="widowed">widowed</option>
							</select>
							{errors.maritalStatus && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.maritalStatus.message}</p>}
						</div>

						{fields.map((field, index) => (
							<>
								<div className="w-full">
									<label htmlFor={`dependents.${index}.response`} className="font-bold">Dependents</label>
									<select
										{...register(`dependents.${index}.response`)}
										className={`w-full p-[10px] border bg-sky-600/20 rounded outline-none ${errors?.dependents?.[index]?.response ? 'border-red-800' : 'border-cyan-950/10'}`}
									>
										<option value=""></option>
										<option value="yes">yes</option>
										<option value="not">not</option>
									</select>
									{errors.dependents?.[index]?.response && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.dependents?.[index]?.response.message}</p>}
								</div>
								<div className="w-full">
									<label htmlFor={`dependents.${index}.quantity`} className="font-bold">If yes, how many?</label>

									<input
										{...register(`dependents.${index}.quantity`, {valueAsNumber: true})}
										className={`w-full p-2 border rounded outline-none ${errors.dependents?.[index]?.quantity ? 'border-red-800' : 'border-cyan-950/10'}`}
										type="number"
										disabled={watch(`dependents.${index}.response`) === 'not'}
									/>
									{errors.dependents?.[index]?.quantity && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.dependents?.[index]?.quantity.message}</p>}
								</div>
							</>
						))}

						<div className="w-full">
							<label htmlFor="cpf" className="font-bold">CPF</label>
							<input
								{...register('cpf', {onChange: e => setValue('cpf', maskCpf(e.target.value), { shouldValidate: true }) })}
								type="text"
								className={`w-full p-2 border rounded outline-none ${errors.cpf ? 'border-red-800' : 'border-cyan-950/10'}`}
								placeholder="000.000.000-00"
							/>
							{errors.cpf && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.cpf.message}</p>}
						</div>
						
						<div className="w-full">
							<label htmlFor="email" className="font-bold">E-mail</label>
							<input
								{...register('email')}
								type="email"
								className={`w-full p-2 border rounded outline-none ${errors.email ? 'border-red-800' : 'border-cyan-950/10'}`}
								placeholder="example@email.com"
							/>
							{errors.email && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.email.message}</p>}
						</div>
						
						<div className="w-full">
							<label htmlFor="phone" className="font-bold">Phone</label>
							<input
								{...register('phone', {onChange: e => 
									setValue('phone', maskPhoneNumber(e.target.value, countriesCtx.phoneFormat, countriesCtx.phoneRegex), { shouldValidate: true }) })}
								type="text"
								className={`w-full p-2 border rounded outline-none ${errors.phone ? 'border-red-800' : 'border-cyan-950/10'}`}
								placeholder= {maskPhoneNumber('00000000000', countriesCtx.phoneFormat, countriesCtx.phoneRegex)}
							/>
							{errors.phone && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.phone.message}</p>}
						</div>

						<div className="w-full">
							<label htmlFor="address" className="font-bold">Address</label>
							<input
								{...register('address')}
								type="text"
								className={`w-full p-2 border rounded outline-none ${errors.address ? 'border-red-800' : 'border-cyan-950/10'}`}
								placeholder="Saint Paul Street" 
							/>
							{errors.address && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.address.message}</p>}
						</div>

						<div className="w-full">
							<label htmlFor="addressNumber" className="font-bold">Number</label>
							<input
								{...register('addressNumber', {valueAsNumber:true})}
								type="number"
								className={`w-full p-2 border rounded outline-none ${errors.addressNumber ? 'border-red-800' : 'border-cyan-950/10'}`}
								placeholder="enter your address number" 
							/>
							{errors.addressNumber && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.addressNumber.message}</p>}
						</div>

						<div className="w-full">
							<label htmlFor="zipCode" className="font-bold">Zip Code</label>
							<input
								{...register('zipCode', {onChange: e => setValue('zipCode', maskZipCode(e.target.value), { shouldValidate: true }) })}
								type="text"
								className={`w-full p-2 border rounded outline-none ${errors.zipCode ? 'border-red-800' : 'border-cyan-950/10'}`}
								placeholder="00000-000"
							/>
							{errors.zipCode && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.zipCode.message}</p>}
						</div>
						
						<div className="w-full">
							<label htmlFor="country" className="font-bold">Country</label>
							<select
								{...register('country')}
								className={`w-full p-[10px] border bg-sky-600/20 rounded outline-none ${errors.city ? 'border-red-800' : 'border-cyan-950/10'}`}
								onChange={(e)=>countriesCtx?.handleCountryChange(e)}
							>	
								<option value="">--</option>
								{countriesCtx?.countries.map((country: any) => (
									<option key={country.code} value={country.code}>{country.name}</option>
								))}
							</select>
							{errors.country && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.country.message}</p>}
						</div>

						<div className="w-full">
							<label htmlFor="state" className="font-bold">State</label>
							<select
								{...register('state')}
								className={`w-full p-[10px] border bg-sky-600/20 rounded outline-none ${errors.city ? 'border-red-800' : 'border-cyan-950/10'}`}
								onChange={(e)=>countriesCtx?.handleStateChange(e)}
							>
								<option value="">--</option>
								{countriesCtx?.states.map((state: any) => (
									<option key={state.code} value={state.code}>{state.name}</option>
								))}
							</select>
							{errors.state && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.state.message}</p>}
						</div>

						<div className="w-full">
							<label htmlFor="city" className="font-bold">City</label>
							<select
								{...register('city')}
								className={`w-full p-[10px] border bg-sky-600/20 rounded outline-none ${errors.city ? 'border-red-800' : 'border-cyan-950/10'}`}
							>
								<option value="">--</option>
								{countriesCtx?.cities.map((city: any) => (
									<option key={city.name} value={city.name}>{city.name}</option>
								))}
							</select>
							{errors.city && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.city.message}</p>}
						</div>
					</div>
				</fieldset>
				<fieldset className="bg-[#f8fbffcc] p-4 rounded-md mb-2">
					<legend className="bg-blue-900 text-white p-2 rounded-md uppercase">professional data</legend>
					<div className="w-full grid xs:grid-cols-1 sm:grid-cols-2 gap-4">

						<div className="w-full">
							<label htmlFor="role" className="font-bold">Role</label>
							<input
								{...register('role')}
								type="text"
								className={`w-full p-2 border rounded outline-none ${errors.role? 'border-red-800' : 'border-cyan-950/10'}`}
								placeholder="enter your desired role"
							/>
							{errors.role && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.role.message}</p>}
						</div>

						<div className="w-full">
							<label htmlFor="workingDay" className="font-bold">Desired Working Day</label>
							<select
								{...register('workingDay')}
								className={`w-full p-[10px] border bg-sky-600/20 rounded outline-none ${errors.workingDay ? 'border-red-800' : 'border-cyan-950/10'}`}
							>
								<option value="full">Full-time</option>
								<option value="part">Part-time</option>
								<option value="free">Freelance</option>
							</select>
							{errors.workingDay && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.workingDay.message}</p>}
						</div>

						<div className="w-full ">
							<div className="w-full flex items-end">
								<div className="w-full">
									<label htmlFor="skills" className="font-bold">Skills</label>
									<input
										type="text"
										value={skill}
										onChange={(e)=> setSkill(e.target.value)}
										className={`w-full p-2 border rounded outline-none ${errors.skills? 'border-red-800' : 'border-cyan-950/10'}`}
										placeholder="enter your skills"
									/>
									{errors.skills && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.skills.message}</p>}
								</div>
								<button title="add skill" type="button" className="bg-blue-950 p-2 rounded-md text-white" onClick={(e)=> addSkill()}>+</button>
							</div>
						</div>

						<div className="w-full grid grid-cols-2 gap-2 p-2" id="skills-list">
							{skillsList.length > 0 &&
								skillsList.map((item, index) => (
									<div className="bg-white rounded-full px-2 h-6 flex items-center outline outline-1 outline-indigo-950/45" key={index}>
										<p className="flex-1">{item}</p>
										<button type="button" onClick={()=> removeSkill(index)}>x</button>
									</div>
								))
							}
						</div>
						
						<div className="w-full">
							<label htmlFor="curriculum" className="font-bold">Curriculum</label>
							<input
								{...register('curriculum')}
								type="file"
								className={`w-full p-2 border rounded outline-none ${errors.curriculum? 'border-red-800' : 'border-cyan-950/10'}`}
								accept="application/pdf"
							/>
							{errors.curriculum && <p className="bg-white/20 text-red-600 px-2 text-sm">{errors.curriculum.message}</p>}
						</div>

					</div>
				</fieldset>
				<div className="text-right mt-4">
					<input
						type="reset" 
						value="Clear" 
						className="bg-gray-300 text-black p-2 rounded-md font-bold mr-2 cursor-pointer"
					/>
					<input
						type="submit" 
						value="Submit" 
						className="bg-green-700 text-white p-2 rounded-md font-bold cursor-pointer hover:bg-green-600" 
					/>
				</div>
			</form>
		</div>
    );
};

const ApplicationForm = () => {
	return (
		<CountriesProvider>
			<ResumeForm/>
		</CountriesProvider>
	)
}

export default ApplicationForm;
