import React from 'react';
import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  CheckCircleIcon,
  LinkIcon,
  MailIcon,
  PencilIcon
} from '@heroicons/react/solid';

import UseAjax from '../components/use-ajax';

function SongsList() {
  const { data, error, state } = UseAjax('/api-v1/songs/');
  const songs = data?.response ?? [];
  console.log(songs);
  return (
    <div className="relative min-h-screen bg-white">
      {/* Page heading */}
      <header className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Drum Practice
            </h1>
          </div>
          <div className="mt-5 flex xl:mt-0 xl:ml-4">
            <span className="hidden sm:block">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
                <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                Edit
              </button>
            </span>

            <span className="hidden sm:block ml-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
                <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                View
              </button>
            </span>
          </div>
        </div>
      </header>

      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <h2 className="text-lg font-medium text-gray-900">Songs</h2>

            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
              </div>
            </div>
          </div>

          {/* Stacked list */}
          <ul role="list" className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0">
            {songs.map((song) => (
              <li key={song.id}>
                <a href={song.path} className="group block">
                  <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="text-sm font-medium text-purple-600 truncate">{song.artist}</p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <span className="truncate">{song.genre}</span>
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-gray-900">
                              {song.title}title
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <nav
            className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0"
            aria-label="Pagination">
            <div className="-mt-px w-0 flex-1 flex">
              <a
                href="#"
                className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200">
                <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                Previous
              </a>
            </div>
            <div className="hidden md:-mt-px md:flex">
              <a
                href="#"
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                1
              </a>
              {/* Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}
              <a
                href="#"
                className="border-purple-500 text-purple-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                aria-current="page">
                2
              </a>
            </div>
            <div className="-mt-px w-0 flex-1 flex justify-end">
              <a
                href="#"
                className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200">
                Next
                <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      </main>
    </div>
  );
}

export default SongsList;
