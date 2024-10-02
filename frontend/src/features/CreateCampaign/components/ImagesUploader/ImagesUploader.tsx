import { Button, Image, Input } from "@nextui-org/react";
import { useField } from "formik";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { ImagesApi } from "src/core/api/Images.api";

interface ImagesUploaderProps {
	name: string;
}

export const ImagesUploader: FC<ImagesUploaderProps> = ({ name }) => {
	const [, { touched, error }, { setValue }] = useField<string[]>(name);

	const [files, setFiles] = useState<File[]>([]);

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files);
			const validFiles = files.filter((file) => file.size <= 2 * 1024 * 1024); // 2MB in bytes

			if (validFiles.length !== files.length) {
				alert("Some files exceed the 2MB size limit and will not be uploaded.");
			}

			setFiles(validFiles);
		}
	}, []);

	const handleUpload = useCallback(async () => {
		try {
			const formData = new FormData();
			files.forEach((file) => formData.append("files", file));

			const response = await ImagesApi.uploadImages(formData);

			console.log(response.data);
			await setValue(response.data.map(({ url }) => url));
		} catch (error) {
			console.error(error);
		}
	}, [files, setValue]);

	return (
		<div>
			<div className="flex gap-4">
				<Input
					className="w-1/2"
					type="file"
					multiple
					accept="image/jpeg,image/png,image/webp"
					max={5}
					onChange={handleChange}
					isInvalid={touched && !!error}
					errorMessage={touched && error}
				/>
				<Button type="button" onClick={handleUpload}>
					Upload
				</Button>
			</div>
			<div className="flex flex-wrap gap-4 p-4">
				{files.map((file) => (
					<Image
						className="w-40 h-40 object-contain border border-gray-300 rounded-md"
						key={file.name}
						src={URL.createObjectURL(file)}
						alt={file.name}
					/>
				))}
			</div>
		</div>
	);
};
