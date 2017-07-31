<?php

namespace Drupal\dashboard\Controller;
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

class DashboardController extends ControllerBase {
  public function index() {
    return [
      '#theme' => 'dashboard',
    ];
  }

  public function data() {
    $events   = \Drupal::entityQuery('node')->condition('type','events')->execute();
    $pages   = \Drupal::entityQuery('node')->condition('type','page')->execute();
    $articles   = \Drupal::entityQuery('node')->condition('type','article')->execute();
    $online = db_query('SELECT uid FROM {sessions} WHERE uid != 0')->fetchAllAssoc('uid');
    $data = array('nodes' => [
      'events'   => count($events),
      'pages' => count($pages),
      'articles' => count($articles),
    ],
    'users' => [
      'total_users' => $this->getUserByRole(),
      'administrator' => $this->getUserByRole('administrator'),
      'authenticated' => $this->getUserByRole('authenticated'),
      'moderator' => $this->getUserByRole('moderator'),
      'online' => count($online),
    ]);
    return new JsonResponse($data);
  }

  private function getUserByRole($key) {
    switch ($key) {
      case 'administrator':
          $users = user_load_multiple();
          $admins = [];
          unset($users[0]);
          foreach ($users as $user) {
            if (in_array("administrator", $user->getRoles())) {
              array_push($admins, $user);
            }
          }
          return count($admins);
        break;

      case 'authenticated':
          $users = user_load_multiple();
          $authenticated = [];
          unset($users[0]);
          foreach ($users as $user) {
            if (in_array("authenticated", $user->getRoles())) {
              array_push($authenticated, $user);
            }
          }
          return count($authenticated);
        break;

      case 'moderator':
          $users = user_load_multiple();
          $moderator = [];
          unset($users[0]);
          foreach ($users as $user) {
            if (in_array("moderator", $user->getRoles())) {
              array_push($moderator, $user);
            }
          }
          return count($moderator);
        break;
      
      default:
        $users = user_load_multiple();
        unset($users[0]);
        return count($users);
        break;
    }
  }
}
