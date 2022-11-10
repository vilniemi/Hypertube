import { Container, Card, Row, Button, Form } from 'react-bootstrap';
import { trpc } from '../../utils/trpc';
import { useState } from 'react';
import { Comment } from '../../types/appTypes';
import CommentRow from '../commentRow';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';

type Inputs = {
	comment_text: string;
};
const schema = z.object({
	comment_text: z.string().min(1, {}),
});

const CommentsSection = ({
	comments,
	imdb_code,
}: {
	comments: Comment[];
	imdb_code: number;
}) => {
	const { data: session } = useSession();
	const [addCommentBtn, setAddCommentBtn] = useState(true);
	const mutation = trpc.comment.createComment.useMutation(  refetchQueries: [
    {query: GET_POST}, // DocumentNode object parsed with gql
    'getMovieComments' // Query name
  ],);
	const addComment = (imdb_code: number, comment_text: string) => {
		try {
			mutation.mutate({
				imdb_code,
				comment_text,
				//user_id: session?.user.id,
				user_id: 'cl9zq8f8m0000pj0i88z7ju3f',
			});
		} catch (err) {
			console.log(err);
		}
	};
	// console.log(session?.user);
	const { data, error } = trpc.comment.getMovieComments.useQuery({
		imdb_code: parseInt(imdb_code),
	});

	const {
		watch,
		register,
		handleSubmit,
		getValues,
		formState: { errors, isSubmitting, isDirty, isValid },
	} = useForm<Inputs>({
		mode: 'onChange',
		resolver: zodResolver(schema),
	});
	const { t }: i18translateType = useTranslation('common');

	const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
		//		event?.preventDefault();

		addComment(imdb_code as number, data.comment_text as string);
	};
	return (
		<>
			<Row className="mb-2">
				<Card.Title>
					{comments?.length} {t('movieInfo.comments')}
				</Card.Title>
			</Row>
			<Row className="mb-3">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group>
						<Form.Control
							className="border-bottom comment-form bg-transparent"
							placeholder="Add comment"
							{...register('comment_text')}
							placeholder={t('movieInfo.addComment')}
							onFocus={() => setAddCommentBtn(false)}
						></Form.Control>
					</Form.Group>
					<Container className="d-flex justify-content-end mt-3" fluid>
						<Button
							className="me-3"
							hidden={addCommentBtn}
							variant="warning"
							type="submit"
						>
							{t('movieInfo.addComment')}
						</Button>
						<Button
							hidden={addCommentBtn}
							variant="outline-dark"
							onClick={() => setAddCommentBtn(true)}
						>
							{t('movieInfo.cancel')}
						</Button>
					</Container>
				</Form>
			</Row>
			<Container fluid>
				{comments &&
					comments?.map((comment) => (
						<div key={comment?.id}>
							<CommentRow comment={comment} />
						</div>
					))}
			</Container>
		</>
	);
};

export default CommentsSection;
/* onSubmit={handleSubmit(newComment) */
