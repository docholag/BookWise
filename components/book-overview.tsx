import Image from 'next/image';
import React from 'react';
import BookCover from './book-cover';
import BorrowBook from './borrow-book';
import { checkUserBorrowStatus, fetchUserById } from '@/lib/data';
import { db } from '@/db/drizzle';
import { borrowRecords, favoriteBooks } from '@/db/schema';
import { and, eq, sql } from 'drizzle-orm';
import FavoriteBook from './favorite-book';
import RenewBook from './renew-book';
import { canRenewRequest } from './borrowed-book-card';

type BookOverviewPropsType = Book & { userId: string };

export default async function BookOverview({
  id,
  userId,
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
}: Readonly<BookOverviewPropsType>) {
  const user = await fetchUserById(userId);
  const isBorrowed = await checkUserBorrowStatus(userId, id);

  const [book] = await db
    .select({
      dueDate: borrowRecords.dueDate,
      status: borrowRecords.status,
    })
    .from(borrowRecords)
    .where(
      and(
        eq(borrowRecords.userId, userId),
        eq(borrowRecords.bookId, id),
        eq(borrowRecords.status, 'BORROWED'),
      ),
    )
    .limit(1);

  // check if dueDate is there and check if the remaining time is less than 3 days
  const isDueSoon = canRenewRequest(book?.dueDate, book?.status);

  const [favoriteBook] = await db
    .select()
    .from(favoriteBooks)
    .where(
      sql`${favoriteBooks.userId} = ${userId} AND ${favoriteBooks.bookId} = ${id}`,
    );

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user.status === 'APPROVED',
    message:
      availableCopies <= 0
        ? 'Book is not available for borrowing'
        : 'You are not eligible to borrow books',
  };

  const favoriteEligibility = {
    isEligible: !favoriteBook,
    message:
      !book || book.status !== 'BORROWED'
        ? ''
        : 'You cannot add this book to your favorites',
  };

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>

        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>

          <p>
            Category:{' '}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>

          <div className="flex flex-row gap-1">
            <Image
              priority
              src="/icons/star.svg"
              className="size-auto"
              width={20}
              height={20}
              alt="star"
            />
            <p>
              <span className="font-semibold text-light-200">{rating}</span>/5
            </p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Total Books: <span>{totalCopies}</span>
          </p>

          <p>
            Available Books: <span>{availableCopies}</span>
          </p>
        </div>

        <p className="book-description">{description}</p>

        <div className="book-btns">
          {user && (
            <BorrowBook
              isBorrowed={isBorrowed}
              bookId={id}
              userId={userId}
              borrowingEligibility={borrowingEligibility}
            />
          )}
          {user && (
            <FavoriteBook
              bookId={id}
              userId={userId}
              addFavoriteEligibility={favoriteEligibility}
            />
          )}
          {isDueSoon && <RenewBook bookId={id} userId={userId} />}
        </div>
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            priority={true}
            bookTitle={title}
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
          <div className="absolute left-40 top-5 rotate-[10.23deg] opacity-50 blur-sm max-sm:hidden">
            <BookCover
              priority={true}
              bookTitle={title}
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
